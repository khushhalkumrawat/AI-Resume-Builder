import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import pdfToText from 'react-pdftotext'
import { LoaderCircleIcon } from 'lucide-react'

const Dashboard = () => {

  const { user, token } = useSelector(state => state.auth)

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')

  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } })
      setAllResumes(data.resumes)
    } catch (error) {

      let message = "Failed to load resumes:";

      // Keep UI usable
      setAllResumes([]);

      // Only notify for important cases
      if (error.response?.status === 401) {
        toast.error("Your session has expired. Please log in again.");
      } else if (!error.response) {
        toast.error("Unable to connect to the server.");
      }
      else {
        toast.error(message);
      }
    }
  }

  const createResume = async (e) => {
    try {
      e.preventDefault()
      const { data } = await api.post('/api/resumes/create', { title }, { headers: { Authorization: token } })
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {

      console.error("Create resume failed:", error);

      let message = "Unable to create your resume. Please try again.";

      if (error.code === "ECONNABORTED") {
        message = "The request timed out. Please try again.";
      } else if (!error.response) {
        message = "Unable to connect to the server. Please check your internet connection.";
      } else if (error.response.status === 401) {
        message = "Your session has expired. Please log in again.";
      } else if (error.response.status === 400) {
        // Show backend validation message only for expected user errors
        message = error.response.data?.message || message;
      }

      toast.error(message);

    }
  }

  const uploadResume = async (e) => {
    e.preventDefault()
    try {
      console.log("before pdf");
      const resumeText = await pdfToText(resume)
      console.log("after pdf");
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, { headers: { Authorization: token, }, });
      console.log("after api");
      setTitle("")
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      console.error("Resume upload failed:", error);

      let message = "Unable to process your resume at the moment. Please try again in a few minutes.";

      if (error.code === "ECONNABORTED") {
        message = "The request took too long. Please try again.";
      } else if (!error.response) {
        message = "Unable to connect to the server. Please check your internet connection.";
      }

      toast.error(message);
    }
  };

  const editTitle = async (e) => {
    try {
      e.preventDefault()
      const { data } = await api.put(`/api/resumes/update`, { resumeId: editResumeId, resumeData: { title } }, { headers: { Authorization: token } })
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume, title } : resume))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    } catch (error) {
      let message = "Unable to update the resume title. Please try again.";

      if (error.code === "ECONNABORTED") {
        message = "The request timed out. Please try again.";
      } else if (!error.response) {
        message = "Unable to connect to the server. Please check your internet connection.";
      } else if (error.response.status === 401) {
        message = "Your session has expired. Please log in again.";
      } else if (error.response.status === 400) {
        message = error.response.data?.message || message;
      }

      toast.error(message);
    }
  }

  const deleteResume = async (resumeId) => {

    try {
      const confirm = window.confirm('Are you sure you want to delete this resume?');
      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, { headers: { Authorization: token } })
        setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
        toast.success(data.message)
      }
    } catch (error) {
      let message = "Unable to delete the resume. Please try again.";

      if (error.code === "ECONNABORTED") {
        message = "The request timed out. Please try again.";
      } else if (!error.response) {
        message = "Unable to connect to the server. Please check your internet connection.";
      } else if (error.response.status === 401) {
        message = "Your session has expired. Please log in again.";
      } else if (error.response.status === 404) {
        message = "The resume could not be found.";
      } else if (error.response.status === 400) {
        message = error.response.data?.message || message;
      }
      toast.error(message);
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8'>

        <p className='text-2xl font-medium mb-6 bg-linear-to-r from slate-600 to slate-700 bg-clip-text text-transparent sm:hidden '> Welcome  ,Joe Doe </p>

        <div className='flex gap-4'>

          <button onClick={() => setShowCreateResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-indigo-300 to-indigo-500 text-white rounded-full' />

            <p className=' text-sm group-hover:text-indigo-600 transition-all duration-300' > Create Resume </p>
          </button>

          <button onClick={() => setShowUploadResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>

            <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-purple-300 to-purple-500 text-white rounded-full' />

            <p className=' text-sm group-hover:text-purple-600 transition-all duration-300' > Upload Existing </p>
          </button>


        </div>

        <hr className='border-slate-300 my-6 sm:w-76.25' />

        <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>

          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <button key={index} onClick={() => navigate(`/app/builder/${resume._id}`)} className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer' style={{
                background: 'linear-gradient(135deg , ${baseColor}10 , ${baseColor}40)', borderColor: baseColor + '40'
              }}>

                <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all' style={{ color: baseColor }} />
                <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{ color: baseColor }}> {resume.title} </p>

                <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center' style={{ color: baseColor + '90' }} > Updated on {new Date(resume.updatedAt).toLocaleDateString()} </p>

                <div onClick={(e) => e.stopPropagation()} className='absolute top-1 right-1 group-hover:flex items-center hidden'>

                  <TrashIcon onClick={() => deleteResume(resume._id)} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors ' />
                  <PencilIcon onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors' />

                </div>

              </button>
            )

          })}

        </div>

        {showCreateResume && (
          <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'> Create a Resume </h2>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Resume Title" className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required />

              <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-600 transition-colors' >
                Create Resume
              </button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={() => { setShowCreateResume(false); setTitle('') }} />


            </div>
          </form>
        )}

        {showUploadResume && (
          <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'> Upload a Resume </h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter Resume Title" className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required />

              <div>
                <label htmlFor="resume-input" className="block text-sm text-slate-700">  Select Resume File
                  <div className="flex flex-col items-center justify-center gap-2 border-group text-slate-400 border-slate-400border-dashed rounded-md p-4 py-10 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                    {resume ? (
                      <p className="text-green-700">{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloudIcon className='size-14 stroke-1' />
                        <p>Upload Resume</p>
                      </>
                    )}
                  </div>
                </label>

                <input type="file" id='resume-input' accept='.pdf' hidden onChange={(e) => setResume(e.target.files[0])} />

              </div>

              <button type="submit" className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-600 transition-colors flex items-center justify-center gap-2'   >
                Upload Resume
              </button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={() => { setShowUploadResume(false); setTitle('') }} />


            </div>
          </form>
        )}

        {editResumeId && (
          <form onSubmit={editTitle} onClick={() => setEditResumeId('')} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'> Edit Resume title </h2>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Resume Title" className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required />

              <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-600 transition-colors' >
                Update
              </button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={() => { setEditResumeId(''); setTitle('') }} />


            </div>
          </form>
        )}

      </div>
    </div>
  )
}

export default Dashboard
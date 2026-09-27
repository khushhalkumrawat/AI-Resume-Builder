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
import bgimage from "../assets/DashboardBG.jpg";

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
     <div className="relative bg-cover bg-center min-h-screen bg-fixed
             before:absolute before:inset-0 before:bg-black/40
             before:z-0" style={{ backgroundImage: `url(${bgimage})` }} >
      <div className='max-w-7xl mx-auto px-4 py-8 '>

        <p className='text-2xl font-medium mb-6 bg-linear-to-r from slate-600 to slate-700 bg-clip-text text-transparent sm:hidden '> Welcome  ,Joe Doe </p>

        <div className='flex gap-4'>
   
     {/* Create Resume Button */}
     <button onClick={() => setShowCreateResume(true)} className="relative w-full sm:max-w-50 h-60 flex flex-col items-center justify-center rounded-2xl overflow-hidden gap-3 border border-cyan-300/50 bg-linear-to-b from-cyan-500/20 via-slate-900/60 to-slate-950/80 backdrop-blur-md group hover:border-cyan-300 hover:bg-cyan-500/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] hover:-translate-y-1transition-all duration-300  cursor-pointer">

     {/* Glow */}
     <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-cyan-400/20 blur-3xl group-hover:bg-cyan-400/30 transition- duration-500 "/>

     {/* Plus icon */}
     <div className="relative z-10 size-16 rounded-full flex items-center justify-center bg-cyan-400/15 border border-cyan-300/50 group-hover:bg-cyan-400/25 group-hover:border-cyan-200 group-hover:scale-110 group-hover:rotate-90 transition-all duration-300">
     <PlusIcon className="size-8 text-cyan-200" />
      </div>

     {/* Text */}
     <div className="relative z-10 text-center">
        <p className="text-xl font-semibold text-white">Create Resume </p>

        <p className="mt-1 text-xs text-cyan-200/70"> Start from scratch</p>
     </div>

     {/* Bottom accent */}
     <div className="absolute bottom-0 left-1/2-translate-x-1/2 w-20 h-1 rounded-full bg-cyan-400/60 group-hover:w-32 transition-all duration-300" />
  </button>

  {/* Upload Resume Button */}

  <button onClick={() => setShowUploadResume(true)} className="relative w-full sm:max-w-50 h-60 flex flex-col items-center justify-center rounded-2xl overflow-hidden gap-3 border border-dashed border-cyan-300/50 bg-linear-to-b from-cyan-500/20 via-slate-900/60 to-slate-950 backdrop-blur-md group hover:border-cyan-300 hover:bg-cyan-500/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">

  {/* Glow */}
  <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-cyan-400/20 blur-3xl group-hover:bg-cyan-400/30 transition-all duration-500"/>

  {/* Upload icon */}
  <div className="relative z-10 size-16 rounded-full flex items-center justify-center bg-cyan-400/15 border border-cyan-300/50 group-hover:bg-cyan-400/25 group-hover:border-cyan-200 group-hover:scale-110 transition-all duration-300">
     <UploadCloudIcon className="size-8 text-cyan-200 group-hover:-translate-y-1 transition-transform duration-300" />
  </div>

  {/* Text */}
  <div className="relative z-10 text-center">
    <p className="text-xl font-semibold text-white">
      Upload Existing
    </p>

    <p className="mt-1 text-xs text-cyan-200/70">
      Import your resume
    </p>
  </div>

  {/* Bottom accent */}
  <div
    className="absolute bottom-0 left-1/2-translate-x-1/2 w-20 h-1 rounded-full bg-cyan-400/60 group-hover:w-32 transition-all duration-300"/>
</button>
  </div>

    <hr className="
  my-8
  h-px
  border-0
  bg-linear-to-r
  from-transparent
  via-cyan-400/50
  to-transparent
" />

        <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>

          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
   <button
  key={index}
  onClick={() => navigate(`/app/builder/${resume._id}`)}
  className="
    relative w-full sm:max-w-50 h-60
    flex flex-col items-center justify-center
    rounded-2xl overflow-hidden
    border border-emerald-400/40
    bg-linear-to-b
    from-emerald-900/60
    via-slate-900/80
    to-slate-950/90
    backdrop-blur-md
    group
    hover:border-emerald-300/70
    hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]
    hover:-translate-y-1
    transition-all duration-300
    cursor-pointer
  "
>

  {/* Background glow */}
  <div
  className="
    absolute -top-20 -right-20
    w-40 h-40
    rounded-full
    bg-emerald-500/20
    blur-3xl
    group-hover:bg-emerald-400/30
    transition-all duration-500
  "
/>

  {/* Resume icon */}
 <div
  className="
    relative z-10
    size-16
    rounded-full
    flex items-center justify-center
    bg-emerald-500/15
    border border-emerald-400/40
    group-hover:scale-110
    group-hover:bg-emerald-500/25
    transition-all duration-300
  "
>
  <FilePenLineIcon className="size-8 text-emerald-300" />
</div>

  {/* Resume title */}
  <p className="
  relative z-10
  mt-5
  text-xl
  font-semibold
  text-white
  text-center
  px-3
  max-w-full
  truncate
">
  {resume.title}
</p>

  {/* Updated date */}
  <p className="
  absolute bottom-3
  left-0 right-0
  text-xs
  text-emerald-200/70
  text-center
">
  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
</p>

  {/* Edit/Delete buttons */}
  <div
    onClick={(e) => e.stopPropagation()}
    className="
      absolute top-2 right-2
      hidden group-hover:flex
      items-center gap-1
      z-20
    "
  >
    <TrashIcon
      onClick={() => deleteResume(resume._id)}
      className="
        size-7 p-1.5
        bg-black/60
        text-white
        hover:bg-red-500
        rounded
        transition-colors
      "
    />

    <PencilIcon
      onClick={() => {
        setEditResumeId(resume._id);
        setTitle(resume.title);
      }}
      className="
        size-7 p-1.5
        bg-black/60
        text-white
        hover:bg-indigo-500
        rounded
        transition-colors
      "
    />
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
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets';
import { resume } from 'react-dom/server';
import ResumePreview from '../components/ResumePreview';
import { ArrowLeftIcon } from 'lucide-react';
import Loader from '../components/Loader';
import api from '../configs/api';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Preview = () => {

  const { resumeId } = useParams();

  const [isLoading, setIsLoading] = useState(true)

  const [resumeData, setResumeData] = useState(null)

  const loadResume = async () => {
    try {
      const { data } = await api.get('/api/resumes/public/' + resumeId)
      setResumeData(data.resume)
    } catch (error) {
      let message = "Failed to load resumes:";

      // Only notify for important cases
      if (error.response?.status === 401) {
        toast.error("Your session has expired. Please log in again.");
      } else if (!error.response) {
        toast.error("Unable to connect to the server.");
      }
      else {
        toast.error(message);
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadResume()
  }, [])

  return resumeData ? (
    <div id="resume-preview" className='bg-slate-100'>
      <div className='max-w-3xl mx-auto py-10'>
        <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} sectionOrder={resumeData.sectionOrder} classes='py-4 bg-white' />
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? <Loader /> : (
        <div className='flex flex-col items-center justify-center h-screen'>
          <p className='text-center text-6xl text-slate-400 font-medium' >Resume Not Found</p>
          <a href="/" className='mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors ' >
            <ArrowLeftIcon className='mr-2 size-4' />
            go to home page
          </a>
        </div>
      )}
    </div>
  )
}

export default Preview
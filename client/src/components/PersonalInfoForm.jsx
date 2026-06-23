import { User } from 'lucide-react'
import React from 'react'

export const PersonalInfoForm = ({ data, onChange, removeBackground, ssetRemoveBackground }) => {
    return (
        <div>

            <h3 className='text-lg font-semibold text-gray-900'>Perosnal Information</h3>
            <p className='text-sm text-gray-600'>Get Started with the personal information</p>
            <div className='flex items-center gap-2'>

                <label>

                    {data.image ? (
                        <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)}
                        alt = "user-image" className = 'w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80' />
                    ) : (
                        <div>
                            <User className = '' />
                        </div>
                    ) }
                </label>

            </div>

        </div>
    )
}

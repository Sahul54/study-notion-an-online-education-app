import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import IconBtn from '../../../../common/IconBtn';
import { FiPlusCircle  } from "react-icons/fi";
import { useSelector } from 'react-redux';

const CourseBuilderForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector({ state } => state.course);


  const cancelEdit = () =>{
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  return (
    <div className='text-white'>
      <h1>Course Builder</h1>
      <form>
        <div>
          <label>Section Name <sub>*</sub></label>
          <input
            id='sectionName'
            placeholder='Add to section'
            {...register("sectionName", { required: true })}
            className='w-full'
          />
          {errors.sectionName && (
            <span>Section Name is required</span>
          )}
        </div>
        <div className='mt-7 flex flex-row gap-4'>
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={'text-white'}
            >
            <FiPlusCircle  className='text-yellow-5 font-bold'/>
          </IconBtn>
          {editSectionName && (
            <button
            type='button'
            onclick={cancelEdit}
            className='text-sm text-richblack-300 underline mt-4'
            >
            Cancle Edit
              
            </button>
          )}
        </div>
      </form>

      
    </div>
  );
};

export default CourseBuilderForm;
 
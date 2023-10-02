'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { Button } from './ui/button';

const CreateProposal = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const isButtonDisabled = !title || !description;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(title);
    console.log(description);
  };

  return (
    <form className="flex flex-col p-2">
      <label className="flex flex-col gap-y-2 bg-black-300 w-[450px] h-[550px] max-xs:w-[350px] rounded-[12px] ">
        <div className="flex-center py-5">
          <Image src="/Quill.png" alt="quill" width={50} height={50} />
        </div>
        <p className="font-Azeret text-[11px] text-grey-100 px-7">Title</p>
        <Input
          className=" h-fit border-0 bg-white-500 w-[400px] max-xs:w-[300px] px-5 self-center py-6 pl-20 pr-8 text-black-400 !ring-0 !ring-offset-0 placeholder:text-black-300  font-lexend"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <p className="font-Azeret text-[11px] text-grey-100 mt-3 px-7">
          Description
        </p>
        <Input
          className="  border-0 bg-white-500 w-[400px] max-xs:w-[300px] h-[200px]  px-5 self-center py-6 pl-20 pr-8 text-black-400 !ring-0 !ring-offset-0 placeholder:text-black-300  font-lexend"
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button
          className={cn(
            ' bg-black-400 h-fit rounded-[15px] text-[20px]  self-center flex-center py-5  font-lexend font-extrabold text-gradient_blue-purple shadow-lg w-[150px]'
          )}
          onClick={handleSubmit}
          disabled={isButtonDisabled}
        >
          Propose
        </Button>
      </label>
    </form>
  );
};

export default CreateProposal;

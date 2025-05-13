import { useState } from "react";
import { Heart, CheckCircle } from "lucide-react"; // Lucide React Icons
import { Button } from "@/components/ui/button"; // Shadcn Button
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Shadcn Card Components
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Shadcn Avatar

/* eslint-disable react/prop-types */
function InternshipItem({ data }) {
  const [liked, setLiked] = useState(false);

  return (
    <Card className='rounded-xl shadow-md w-[28rem] h-[38rem] hover:shadow-lg transition-all duration-300 relative mb-4 sm:w-[32rem] sm:h-[43rem] md:w-[31rem] md:h-[34rem]'>
      {/* Card Header with Date and Like Button */}
      <CardHeader className='flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center'>
        <span className='bg-white p-4 rounded-full font-decorative text-xs'>
          {data.date}
        </span>
        <div className='cursor-pointer' onClick={() => setLiked(!liked)}>
          {liked ? (
            <Heart className='text-red-500' />
          ) : (
            <CheckCircle className='text-green-500' />
          )}
        </div>
      </CardHeader>

      {/* Card Content with Company and Title */}
      <CardContent className='flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mt-4'>
        <div>
          <span className='font-semibold'>{data.company}</span>
          <h3 className='text-lg'>{data.title}</h3>
        </div>
        <Avatar className='w-20 h-20'>
          <AvatarImage
            src={data.image}
            alt='company logo'
            className='rounded-full'
          />
          <AvatarFallback className='bg-gray-200 text-gray-500'>
            Logo
          </AvatarFallback>
        </Avatar>
      </CardContent>

      {/* Key Points */}
      <div className='hidden sm:flex flex-wrap gap-2 mt-4'>
        {data.keyPoints.map((point, i) => (
          <span
            key={i}
            className='text-sm py-2 px-4 rounded-full shadow-sm bg-gray-100 border border-gray-300'
          >
            {point}
          </span>
        ))}
      </div>

      {/* Card Footer with Location, Salary, and Button */}
      <CardFooter className='flex justify-between items-center mt-6'>
        <div>
          <p className='text-base font-semibold'>{data.salary}</p>
          <p className='text-sm'>{data.location}</p>
        </div>
        <Button variant='default' className='px-6 py-2 rounded-full text-sm'>
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export default InternshipItem;

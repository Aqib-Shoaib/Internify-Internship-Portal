import { useState } from "react";
import { Heart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

/* eslint-disable react/prop-types */
function InternshipItem({ data }) {
  const [liked, setLiked] = useState(false);
  return (
    <Card className='rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative mb-4 max-h-[20rem] md:max-h-[22rem] max-w-[25rem] min-h-[20rem] md:min-h-[22rem] min-w-[25rem]'>
      {/* Card Header with Date and Like Button */}
      <CardHeader className='flex justify-between items-center'>
        <span className='bg-white px-4 py-2.5 rounded-full font-decorative text-sm font-medium md:text-base'>
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
      <CardContent className='flex justify-between sm:items-center mt-4'>
        <div>
          <span className='font-semibold text-sm md:text-base'>
            {data.company}
          </span>
          <h3 className='text-base md:text-lg font-medium'>{data.title}</h3>
        </div>
        <Avatar className='w-10 md:w-16 h-10 md:h-16'>
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
      <div className='flex flex-wrap gap-2 mt-4'>
        {data.keyPoints.map((point, i) => (
          <span
            key={i}
            className='text-sm font-medium py-2 px-4 rounded-full shadow-sm bg-gray-100 border border-gray-300'
          >
            {point}
          </span>
        ))}
      </div>

      {/* Card Footer with Location, Salary, and Button */}
      <CardFooter className='flex justify-between items-center mt-6'>
        <div>
          <p className='text-base font-semibold'>{data.salary}</p>
          <p className='text-sm capitalize'>{data.location}</p>
        </div>
        <Button variant='ghost' className='px-6 py-2 rounded-full text-sm'>
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export default InternshipItem;

import { useEffect, useState } from "react";
import { Heart, CheckCircle, Star, Loader } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { saveInternship } from "@/services/intern";
import toast from "react-hot-toast";

/* eslint-disable react/prop-types */
function InternshipItem({ data }) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [saved, setsaved] = useState(false);
  const [loading, setLoading] = useState();

  useEffect(
    function () {
      function isSaved() {
        return user.savedInternships.includes(data._id);
      }
      const ff = isSaved();
      setsaved(ff);
    },
    [data._id, user.savedInternships]
  );

  async function toggleSave(e) {
    e.stopPropagation();
    setLoading(true);
    const res = await saveInternship(data._id);
    if (res.status === 200) {
      toast.success("Internship Saved!");
      setLoading(false);
      setsaved(true);
    } else {
      toast.error("Could not Save Internship");
    }
  }

  const keypoints = [data?.location, data?.term, `$${data?.salary}`];
  const formatted = new Date(data?.expiryDate).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <Card
      className='rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative mb-4 max-h-[20rem] md:max-h-[22rem] max-w-[20rem] min-h-[20rem] md:min-h-[20rem] min-w-[20rem]'
      onClick={() => navigate(`/internships/${data?.slug}`)}
      data-aos='zoom-in'
    >
      <CardHeader className='flex justify-between items-center'>
        <div>
          <h3 className='text-base md:text-lg font-medium text-secondary-foreground bg-secondary rounded-full py-1 px-2 cursor-pointer hover:bg-secondary/90'>
            {data?.title}
          </h3>
        </div>
        {data?.sponsored && (
          <span>
            <Star className='text-primary ' />
          </span>
        )}
      </CardHeader>

      {/* Card Content with Company and Title */}
      <CardContent className='flex flex-col'>
        <div className='flex gap-2 items-center mb-1'>
          <Avatar className='w-10 md:w-16 h-10 md:h-16'>
            <AvatarImage
              src={data?.profileImage || "/user.png"}
              alt='company logo'
              className='rounded-full'
            />
            <AvatarFallback className='bg-gray-200 text-gray-500'>
              Logo
            </AvatarFallback>
          </Avatar>
          <span className='font-semibold text-sm md:text-base mb-1'>
            {data?.company?.name}
          </span>
        </div>
        {/* Key Points */}
        <div className='flex flex-wrap gap-2'>
          {keypoints.map((point, i) => (
            <span
              key={i}
              className='text-sm font-medium py-2 px-4 rounded-full shadow-sm bg-gray-100 border border-gray-300'
            >
              {point}
            </span>
          ))}
        </div>
      </CardContent>

      {/* Card Footer with Location, Salary, and Button */}
      <CardFooter className='flex justify-between'>
        <span className='bg-white px-4 py-2.5 rounded-full font-decorative text-sm font-medium md:text-base'>
          {formatted}
        </span>
        <div className='cursor-pointer' onClick={() => setsaved(!saved)}>
          {loading ? (
            <Loader />
          ) : saved ? (
            <CheckCircle className='text-green-500' />
          ) : (
            <Heart className='text-red-500' onClick={(e) => toggleSave(e)} />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export default InternshipItem;

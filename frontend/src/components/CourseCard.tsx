import React from "react";
import { FaStarHalfAlt } from 'react-icons/fa';
import imageAdd from "./../assets/course2.png";
import insADD from "./../assets/ins1.png";
import { useAuthStore } from "../store/store";
import api from "../store/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  course: {
    id: number;
    name: string;
    price: number;
    maxSeats: number;
    instructorId: string;
    duration: string;
    category: string;
    imageUrl: string;
    instructor: string;
  };
  isBuyed: boolean; // Add a new prop to determine if the course is bought or not
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isBuyed }) => {
  const { user } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore((state) => state);
  const { id, name, maxSeats = 25,  duration, imageUrl = {imageAdd},  category = 'Programming' , instructor} = course;


  const enrollCourse = async () => {
    try {
      // console.log("the data for the in course compoen user ", user?.id, id);

      if (!isLoggedIn) {
        toast.error('Please signup to enroll ', { style: { backgroundColor: "#e34530", color: "white" } });
        navigate("/signup");
        return;
      }

      const response = await api.post('/leads/register/course', {
        leadId: user?.id,
        courseId: id,
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-lg max-w-80 shadow-lg overflow-hidden h-auto">
      <img src={imageUrl.toString()} alt={name} className="w-full h-48 object-cover" />
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <span className="bg-green-500 font-bold text-xs text-white px-3 py-1 rounded-full mr-2">
              {duration} days
            </span>
          </div>
          <span className="bg-blue-600 text-xs text-white px-3 py-1 rounded-full">
            {maxSeats} seats
          </span>
          <div className="flex items-center bg-extratouch rounded-full px-2">
            <FaStarHalfAlt className="text-white" />
            <span className="text-white font-bold ml-2">4.5</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-700 my-3">{name}</h3>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img src={insADD} alt="instructor iamge" className="mr-2 rounded-full w-8 h-8" />
            <span className=" italic">{instructor}</span>
          </div>
          <span className="bg-blue-200 text-xs text-blue-700 px-2 py -1 rounded-full">{category}</span>
        </div>
        {isBuyed ? (
          <div className="flex justify-center bg-secondary py-2 rounded-lg items-center">
            <span className="text-white font-bold">Enrolled</span>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold">$ 99.99</span>
            </div>
            <button onClick={enrollCourse} className="bg-primary hover:bg-tertiary text-white px-4 py-2 rounded flex items-center">
              Enroll Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
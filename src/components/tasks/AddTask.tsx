import { FormEvent, useState } from 'react'
import Input from '../UI/Input'
import Button from '../UI/Button';
import IconCalendar from '../../assets/icons/Calendar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Task } from '../../store/todo/todo.types';
import uuid from 'react-uuid';
import { useDispatch } from 'react-redux';
import { addTaskToList } from '../../store/todo/todo.slice';

type AddTaskProps = {
  listId: string,
};

const AddTask: React.FC<AddTaskProps> = ({listId}) => {
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState("");  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
     setSelectedDate(date);
  };

  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (taskTitle) {
       let newTask: Task = {
          title: taskTitle,
          id: uuid(),  
          completion: false,
          date: selectedDate!
       };
      dispatch(addTaskToList({listId: listId!,task: newTask}));
      setTaskTitle("");
      setSelectedDate(null);
    }
  }
  return (
    <div className="p-2 m-5">
       <div className="flex flex-col w-full h-28 p-2 text-white bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
         <form onSubmit={handleAddTask}>
              <Input 
                  type="text"
                  value={taskTitle}
                  placeholder="Add Task"
                  className="w-full h-10 p-3 text-gray-900 bg-white border border-gray-300 rounded-lg sm:text-md focus:ring-gray-500 focus:border-gray-500"
                  onChange={e => setTaskTitle(e.target.value)}
               />
            <div className="flex justify-between items-center bg-gray-100 p-2">
              <div className="flex justify-center items-center">
                 <DatePicker
                   selected={selectedDate}
                   onChange={handleDateChange}
                   dateFormat="dd/MM/yyyy"
                   customInput={<IconCalendar className="bg-gray-600"/>}
                 />
                 <p className="text-black ml-2">
                   { selectedDate?.toLocaleDateString('en-GB') }
                 </p>
              </div>
              <div>
                <Button
                  type="submit"
                  className="bg-white w-16 flex items-center justify-center p-2 ml-1 rounded-lg text-black text-sm border"
                 >
                  Add
               </Button>
             </div>
            </div>
         </form>
       </div>
    </div>
  )
}

export default AddTask
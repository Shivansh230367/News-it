import axios from "axios";
import React, { useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../../store/atom/token";
import Toast from "../../Toasts/Toast";
const NotesCard = ({ title, details, id, notesUpdated, setNotesUpdated }) => {
  const token = useRecoilValue(tokenAtom);
  const [toastMessage, setToastMessage] = useState("");
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const handleNoteDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.delete(
        `http://localhost:8000/api/v1/notes/remove/${id}`,
        config
      );
      setNotesUpdated(!notesUpdated);
      setToast("toast-success");
      setToastMessage("The note is deleted successfully");
      setShowToast(true);
      setTimeout(() => {
          setShowToast(false);
      }, 3000);
    } catch (err) {
      setToast("toast-danger");
      setToastMessage("Error Occured");
      console.log(err);
      setShowToast(true);
      setTimeout(() => {
          setShowToast(false);
      }, 3000);
      return;
    }
  };
  const handleNoteEdit = async (id) => {
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.put(
        `http://localhost:8000/api/v1/notes/${id}`,
        config
      );
      setNotesUpdated(!notesUpdated);
      setToast("toast-success");
      setToastMessage("Note was updated successfully");
      setShowToast(true);
      setTimeout(() => {
          setShowToast(false);
      }, 3000);
    }catch(err){
      setToast("toast-danger");
      setToastMessage("Error Occured");
      console.log(err);
      setShowToast(true);
      setTimeout(() => {
          setShowToast(false);
      }, 3000);
      return;
    }
  };

  return (
    <div className="max-w-sm h-[12rem] rounded overflow-hidden shadow-2xl relative">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-black border border-b-black border-transparent">
          {!title ? details : title}
        </div>
        <p className="text-gray-700 text-base line-clamp-3 text-left">
          {details}
        </p>
      </div>
      <div className="px-6 pb-4 flex justify-around absolute bottom-0 inset-x-0">
        <MdDelete
          onClick={()=>handleNoteDelete(id)}
          className="text-red-900 cursor-pointer text-2xl"
        />
        <MdEditSquare
          onClick={()=>handleNoteEdit(id)}
          className="text-yellow-900 cursor-pointer text-2xl"
        />
      </div>
      {showToast?<Toast setShowToast={setShowToast} message={toastMessage} toast={toast} />:<div/>}
    </div>
  );
};

export default NotesCard;

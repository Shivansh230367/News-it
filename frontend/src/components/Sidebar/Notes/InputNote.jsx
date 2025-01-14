import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../../store/atom/token";
import Toast from "../../Toasts/Toast";

const InputNote = ({ setNotesUpdated, notesUpdated }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const token = useRecoilValue(tokenAtom);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const inputRef = useRef("");
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className="flex flex-col">
      <label htmlFor="" className="text-black">
        Title:
      </label>
      <input
        type="text"
        className="bg-white border border-black rounded-md mb-2 text-black"
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="" className="text-black">
        Body:
      </label>
      <textarea
        name="NoteBody"
        cols="30"
        rows="20"
        className="bg-white border border-black rounded-md text-black"
        style={{ resize: "none" }}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      ></textarea>
      <button
        onClick={async () => {
          try {
            await axios.post(
              "http://localhost:8000/api/v1/notes/save",
              {
                title: title,
                details: details,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setTitle("");
            setDetails("");
            setNotesUpdated(!notesUpdated);
            setToast("toast-success");
            setToastMessage("Note was updated successfully");
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
            }, 3000);
            inputRef.current.focus();
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
        }}
        className="bg-green-950 mt-1 hover:bg-green-800 h-112 text-white"
      >
        Save
      </button>
      {showToast ? (
        <Toast
          setShowToast={setShowToast}
          message={toastMessage}
          toast={toast}
        />
      ) : (
        <div />
      )}
    </div>
  );
};

export default InputNote;

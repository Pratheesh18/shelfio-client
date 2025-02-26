import React, { useState } from "react";

import Button from "../Buttons/Button";
import Popup from "../Popup/Popup";
import Input from "../Inputs/Input";
import { useBookCtx } from "../../Contexts/BookCtx";

const CreateBook = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [bookName, setBookName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { createBook } = useBookCtx();

  const createBtnHandler = async () => {
    if (!bookName.trim()) return;

    setIsLoading(true);
    try {
      const payload = { title: bookName.trim() };
      await createBook(payload);
      setBookName("");
      setShowPopup(false);
    } catch (error) {
      console.error("Error creating book:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter" && bookName.trim()) {
      console.log("Enter key pressed");
      e.preventDefault();
      createBtnHandler();
    }
  };

  return (
    <div className="relative flex w-full">
      <Button
        onClick={() => setShowPopup(true)}
        name="Create Book +"
        type="secondary"
      />

      <Popup
        heading="Create Book"
        show={showPopup}
        onClose={() => setShowPopup(false)}
      >
        <div className="flex flex-col w-full space-y-5">
          <Input
            autoFocus={true}
            onChange={(e) => setBookName(e.target.value)}
            onKeyDown={handleEnterKeyPress}
            label="Book Name"
            value={bookName}
            type="text"
          />

          <Button
            disable={!bookName}
            onClick={createBtnHandler}
            name="Create"
            isLoading={isLoading}
          />
        </div>
      </Popup>
    </div>
  );
};

export default CreateBook;

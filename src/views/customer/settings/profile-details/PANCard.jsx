import React, { Fragment, useEffect, useState } from "react";

import { Api } from "@api/Api.jsx";

import Modal from "@/components/common/Modal.jsx";

export default function PANCard() {
  const [PANImage, setPANImage] = useState(null);
  const [PANImagePreview, setPANImagePreview] = useState(null);
  const [PANImageFileName, setPANImageFileName] = useState("");
  const [PANImageFileSize, setPANImageFileSize] = useState(0);
  const [isPANUploading, setIsPANUploading] = useState(false);
  const [PANDetails, setPANDetails] = useState({});
  const [showRemovePANCardConfirmModal, setShowRemovePANCardConfirmModal] =
    useState(false);

    // useEffect(() => {
    //   Api.get('/kyc/pan-card').then((response) => {
    //     setPANDetails(response.data);
    //   }).catch(error => {
    //     console.log(error);
    //   })
    // }, [])

  const handlePANImageUpload = (e) => {
    if (e.target.files[0].size > 2000000) {
      alert("File size must be less than 2MB");
      return;
    }

    setPANImage(e.target.files[0]);
    setPANImageFileName(e.target.files[0].name);
    setPANImageFileSize(e.target.files[0].size);
    setPANImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const removePANImage = () => {
    setPANImage(null);
    setPANImageFileName("");
    setPANImageFileSize(0);
    setPANImagePreview(null);
    setPANDetails({});
  };

  const handleSubmitPAN = async (e) => {
    e.preventDefault();

    setIsPANUploading(true);

    let formData = new FormData();
    formData.append("file", PANImage);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await Api.post("/kyc/pan-card", formData, config)
      .then((res) => {
        setPANDetails(res.data);
        setIsPANUploading(false);
      })
      .catch((err) => {
        setIsPANUploading(false);
      });
  };

  return (
    <Fragment>
      <Modal
        open={showRemovePANCardConfirmModal}
        onClose={() => setShowRemovePANCardConfirmModal(false)}
        applyclassName="max-w-md"
      >
        <div className="px-4 pt-2 text-center rounded">
          <h6 className="inter text-lg font-semibold">Delete PAN card?</h6>
          <p className="mt-2 text-sm text-gray-500">
            Your PAN card will be deleted
          </p>
          <div className="mt-6 flex gap-2">
            <button
              className="w-1/2 py-2 text-gray-500 hover:text-black font-semibold hover:bg-gray-100 border border-gray-300 duration-200 rounded-md"
              onClick={() => setShowRemovePANCardConfirmModal(false)}
            >
              Cancel
            </button>
            <button className="w-1/2 py-2 text-white font-semibold bg-red-500 hover:bg-red-700 duration-200 rounded-md">
              Confirm delete
            </button>
          </div>
        </div>
      </Modal>

      <h6 className="mt-4 font-semibold text-md">PAN Card</h6>

      {PANDetails.Pan_number && (
        <div className="my-2 p-3 text-sm flex gap-2 border border-dashed rounded-md">
          <img className="w-40" src={PANImagePreview} />
          <div className="w-full flex items-start justify-between">
            <div className="flex gap-2">
              <div>
                <p>Name:</p>
                <p>Father's Name:</p>
                <p>Date of birth:</p>
                <p>PAN:</p>
              </div>
              <div>
                <p>{PANDetails.Name}</p>
                <p>{PANDetails.Father_Name}</p>
                <p>{PANDetails.DOB}</p>
                <p>{PANDetails.Pan_number}</p>
              </div>
            </div>
            <button
              className="py-1.5 px-2 text-sm font-semibold text-red-400  hover:text-red-500 bg-red-50 hover:bg-red-100 border border-red-100 rounded-md"
              onClick={removePANImage}
            >
              <i className="fa-solid fa-times fa-fw"></i>
            </button>
          </div>
        </div>
      )}

      {!PANDetails.Pan_number && (
        <Fragment>
          {PANImagePreview ? (
            <div className="my-2 p-3 flex border border-gray-200 border-dashed gap-4 rounded-md">
              <img
                src={PANImagePreview}
                className="w-40"
                alt="PAN Image Preview"
              />
              <div className="w-full">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h6 className="text-sm">{PANImageFileName}</h6>
                    <p className="mt-1 text-sm text-gray-400">
                      {(PANImageFileSize / 1024).toFixed(2) + " KB"}
                    </p>
                  </div>
                  {!isPANUploading && (
                    <div className="flex gap-2">
                      <button
                        className="py-1.5 px-2 text-sm font-semibold text-red-400  hover:text-red-500 bg-red-50 hover:bg-red-100 border border-red-100 rounded-md"
                        onClick={removePANImage}
                      >
                        <i className="fa-solid fa-times fa-fw"></i>
                      </button>
                      <button
                        className="py-1.5 px-4 text-sm font-semibold bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:text-gray-700 rounded-md"
                        onClick={handleSubmitPAN}
                      >
                        <i className="fa-solid fa-upload"></i> Upload
                      </button>
                    </div>
                  )}
                  {isPANUploading && (
                    <div className="flex gap-2">
                      <p
                        className="py-1.5 text-sm font-semibold text-gray-500 rounded-md"
                        disabled={true}
                      >
                        <i className="fa-solid fa-circle-notch fa-fw fa-spin"></i>{" "}
                        Upload in progress ...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="my-2 flex items-center justify-center w-full">
              <label
                htmlFor="pan-card"
                className="flex flex-col items-center justify-center w-full h-40 border border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-2 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">JPG or PNG, upto 2 MB</p>
                </div>
                <input
                  id="pan-card"
                  className="hidden"
                  type="file"
                  onChange={(e) => handlePANImageUpload(e)}
                />
              </label>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

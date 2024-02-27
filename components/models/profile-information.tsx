import { Toaster, toast } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { CountrySelect, CountrySelectValue } from "../country-select";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { set } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { FileUpload } from "../file-upload";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import Select from "react-select";
import { fileURLToPath } from "url";
import filiers from "@/data/filiers";
import { ProfileSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FillInformation } from "@/actions/profile/fill-information";
import { Button } from "../ui/button";
import { User } from "next-auth";
import Stepper from "./stepper";
import { MdClose } from "react-icons/md";

interface ProfileInformationForm {
  location: string;
  personalInformation: string;
  profilePicture: string;
}

interface userDataProps {
  user: User;
}

export const ProfileInformation = () => {
  const user = useSession();
  const initialDate = user?.data?.user?.DateOfBirth
    ? new Date(user?.data?.user?.DateOfBirth)
    : new Date();
  const initailFilier = user?.data?.user?.filier
    ? user?.data?.user?.filier
    : "";
  const initailImageUrl = user?.data?.user?.image
    ? user?.data?.user?.image
    : "";
    const initialeAbout = user?.data?.user?.about
    ? user?.data?.user?.about
    : "";
    const initialeOrigin = user?.data?.user?.origin
    ? user?.data?.user?.origin
    : "";


  const [initailFilierValue, setInitailFilierValue] =
    useState<string>(initailFilier);

  const [currentStep, setCurrentStep] = useState(1);
  const [date, setDate] = useState<Date>(initialDate);
  const [optionSelected, setOptionSelected] = useState<string>("");
  const [about, setAbout] = useState<string>(initialeAbout);
  const [imageUrl, setImageUrl] = useState<string>(initailImageUrl);
  const [isloading, setIsloading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [origin, setOrigin] = useState<string>(initialeOrigin);

  const steps = [
    {
      title: "Your location",
    },
    {
      title: "Personal Information",
    },
    {
      title: "Profile Picture",
    },
  ];
  const filierOptions = filiers;

  const [location, setLocation] = useState<CountrySelectValue>();

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === 3) {
        return prevStep;
      }

      if (prevStep === 2) {
        if (date && optionSelected && about) {
          return prevStep + 1;
        } else {
          toast.error("Please fill all the fields");
          return prevStep;
        }
      }

      if (prevStep === 1) {
        if (location) {
          return prevStep + 1;
        } else {
          toast.error("Please select your location");
          return prevStep;
        }
      }

   
      return prevStep;
    });
  };

  const handelPrevious = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const handelSubmit = async () => {
    const data = {
      date: date as Date,
      optionSelected: optionSelected as string,
      imageUrl: imageUrl as string,
      country: location?.region as string,
      about: about as string,
    };
    await FillInformation(data)
      .then((res) => {
        if (res) {
          toast.success("Profile Information Added Successfully");
        }
      })
      .then(() => {
        setIsFinished(true);
      });
  };

  return (
    <>
      <Toaster />
      <AlertDialog>
        <AlertDialogTrigger className="flex items-center gap-x-2" asChild>
          <Button className="w-full ">Fill some information</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-[50%]">
          <AlertDialogTitle className="flex justify-between items-center w-full">
            <div>
              <span>
                For a better experience, you should fill some information.
              </span>
            </div>
            <div>
              <AlertDialogTrigger asChild>
                <button>
                  <MdClose size={24} />
                </button>
              </AlertDialogTrigger>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <div className="w-full">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              isFinished={isFinished}
            />
          </div>

          {currentStep === 1 && (
            <div>
              <h1>{steps[0].title}</h1>
              <CountrySelect
                value={location}
                onChange={(value) => setLocation(value)}
              />
              <div className="flex items-center justify-center">
                <button
                  onClick={handleNext}
                  className="w-full mt-4 bg-primary text-white rounded-md py-2"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h1>{steps[1].title}</h1>

              <div className="flex flex-row items-start">
                <div className="flex-1 pr-4">
                  <div className="mt-3 mb-3">Your Birdhday</div>
                  <Calendar
                    mode="single"
                    selected={date as Date}
                    onSelect={setDate as any}
                    className="rounded-md border w-full"
                  />
                </div>

                <div className="flex-1 ">
                  <div className="mt-3 mb-3">Select Your filier</div>

                  <Select
                    options={filierOptions}
                    placeholder="Select your filier"
                    className="w-full rounded-md border py-2 px-4 mb-3"
                    value={
                      filierOptions.find(
                        (option) => option.value === initailFilierValue
                      ) || null
                    }
                    onChange={(value) => {
                      setInitailFilierValue(value?.value as string);
                      setOptionSelected(value?.value as string);
                    }}
                    formatOptionLabel={(option) => {
                      return (
                        <div>
                          <div>{option.option}</div>
                        </div>
                      );
                    }}
                  />
                  <div className="mb-3">What about you</div>

                  <Textarea
                    placeholder="Tell us about yourself"
                    className="w-full rounded-md border py-2 px-4 mb-3 h-48"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-row justify-between gap-3">
                <div className="flex-1">
                  <button
                    onClick={handelPrevious}
                    className="w-full mt-4 bg-primary text-white rounded-md py-2"
                  >
                    Previews
                  </button>
                </div>
                <div className="flex-1">
                  <button
                    onClick={handleNext}
                    className="w-full mt-4 bg-primary text-white rounded-md py-2"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h1>{steps[2].title}</h1>
              <div>
                {isloading ? (
                  <div className="flex justify-center mt-3 mb-3">
                    <BeatLoader />
                  </div>
                ) : (
                  <FileUpload
                    endpoint="courseImage"
                    onUploadBegin={() => setIsloading(true)}
                    onChange={(url) => {
                      if (url) {
                        setImageUrl(url);
                        setIsloading(false);
                        setIsFinished(true);

                        console.log(
                          "country" +
                            location?.region +
                            "date" +
                            date +
                            "about" +
                            about
                        );
                      }
                    }}
                  />
                )}
                <div className="text-xs text-gray-500 mt-2">
                  {imageUrl ? (
                    <h2>You Can modifie it By uploading another</h2>
                  ) : (
                    <h2>You Profile Picture will display here</h2>
                  )}
                </div>
                {imageUrl && (
                  <div className="flex justify-center mt-3 ">
                    <Image
                      src={imageUrl}
                      alt="profilePicture"
                      className="boreder-sm rounded-full "
                      width={150}
                      height={150}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center">
                <div className="flex-1">
                  <button
                    onClick={handelPrevious}
                    className="w-full mt-4 bg-primary text-white rounded-md py-2"
                  >
                    Previous
                  </button>
                </div>
                <div className="flex-1">
                  <button
                    onClick={handelSubmit}
                    className="w-full mt-4 bg-primary text-white rounded-md py-2"
                  >
                    submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </AlertDialogContent>
        <AlertDialogOverlay />
      </AlertDialog>
    </>
  );
};

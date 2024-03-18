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
import { Origin } from "@prisma/client";
import { Plus, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { FormLabel } from "../ui/form";
import { Label } from "../ui/label";
import ProfileHeader from "./_components/ProfileHeader";

interface ProfileInformationForm {
  location: string;
  personalInformation: string;
  profilePicture: string;
}

interface userDataProps {
  user: User;
}
interface data {
  date: Date;
  optionSelected: string;
  imageUrl: string;
  country: CountrySelectValue | undefined;
  about: string;
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
  const initialeAbout = user?.data?.user?.about ? user?.data?.user?.about : "";
  const initialFilier = user?.data?.user?.filier || "";

  const initialeOrigin = user?.data?.user?.origin || {
    id: "",
    userId: "",
    value: "",
    label: "",
    flag: "",
    region: "",
    lalng: [0, 0],
  };

  const [initailFilierValue, setInitailFilierValue] =
    useState<string>(initailFilier);
    const initialSubtitle = user?.data?.user?.subtitle ? user?.data?.user?.subtitle : "";
    const initialPatients = user?.data?.user?.patients ? user?.data?.user?.patients : [];

  const [currentStep, setCurrentStep] = useState(1);
  const [date, setDate] = useState<Date>(initialDate);
  const [optionSelected, setOptionSelected] = useState<string>(initailFilier);
  const [about, setAbout] = useState<string>(initialeAbout);
  const [imageUrl, setImageUrl] = useState<string>(initailImageUrl);
  const [isloading, setIsloading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [origin, setOrigin] = useState<Origin>(initialeOrigin);
  const [patient, setPatient] = useState<string>("");
  const [patiants, setPatiants] = useState<string[]>(initialPatients);
  const [subtitle, setSubtitle] = useState<string>(initialSubtitle);

  const steps = [
    {
      title: "Your location",
    },
    {
      title: "Personal Information",
    },
    {
      title: "Finish",
    },
    {
      title: "Profile Picture",
    },
  ];
  const filierOptions = filiers;

  const [location, setLocation] = useState<CountrySelectValue>();

  const onpatientPuch = async (data: any) => {
    await setPatiants((prev) => {
      const updatedOptions = [...prev, data];

      setPatient("");

      return updatedOptions;
    });
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === 2) {
        if (date && optionSelected && about) {
          return prevStep + 1;
        } else {
          toast.error("Please fill all the fields");
          return prevStep;
        }
      }

      if (prevStep === 1) {
        if (origin) {
          return prevStep + 1;
        } else {
          toast.error("Please select your location");
          return prevStep;
        }
      }

      return prevStep + 1;
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
      country: origin as CountrySelectValue,
      about: about as string,
      subtitle: subtitle as string,
      patients: patiants as string[],
    };
    await FillInformation(data)
      .then((res) => {
        if (res.success) {
          toast.success("Profile Information Added Successfully");
        } else {
          toast.error("Error Adding Profile Information");
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
        <AlertDialogContent className="max-w-[50%] overflow-hidden">
          <AlertDialogTitle className="flex justify-between items-center w-full">
            <ProfileHeader user={user?.data?.user!} />

            <div>
              <AlertDialogTrigger asChild>
                <button>
                  <MdClose size={24} />
                </button>
              </AlertDialogTrigger>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <div className="">
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
                value={origin}
                /* @ts-ignore */
                onChange={(value) => setOrigin(value)}
              />
              <div className="flex items-center justify-center">
                <button
                  onClick={handleNext}
                  className="mt-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 w-full rounded-md py-2"
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

              <div className="flex flex-row justify-between gap-3 items-center">
                <div className="flex-1">
                  <button
                    onClick={handelPrevious}
                    className="mt-4 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 w-full rounded-md py-2"
                  >
                    Previews
                  </button>
                </div>
                <div className="flex-1">
                  <button
                    onClick={handleNext}
                    className="mt-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 w-full rounded-md py-2"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
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

              <div className="flex items-center justify-center gap-x-3">
                <div className="flex-1">
                  <button
                    onClick={handelPrevious}
                    className="mt-4 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 w-full rounded-md py-2"
                  >
                    Previous
                  </button>
                </div>
                <div className="flex-1">
                  <button
                    onClick={handelSubmit}
                    className="mt-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 w-full rounded-md py-2"
                  >
                    submit
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <div className="flex flex-col gap-6">
                <div>
                  <Label>Subtitle</Label>
                  <Input
                    placeholder="You subtitle"
                    onChange={(e) => setSubtitle(e.target.value)}
                    value={subtitle}
                  />
                </div>

                <div className="flex items-center justify-between gap-x-3">
                  <Input
                    placeholder="You patiants"
                    value={patient}
                    onChange={(e) => setPatient(e.target.value)}
                  />
                  <button
                    onClick={() => onpatientPuch(patient)}
                    disabled={patient === ""}
                    className="ml-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center "
                  >
                    <Plus className="w-6 h-6 " />
                  </button>
                </div>
              </div>
              <div className="mt-3">
                {patiants && (
                  <div className="grid grid-cols-4 gap-x-2 gap-y-2">
                    {patiants.map((option, index) => {
                      if (option === null) return null;
                      return (
                        <Badge variant="outline" className="mt-2 p-1 relative">
                          {option}
                          <X
                            onClick={() => {
                              setPatiants((prev) => {
                                const updatedOptions = prev.filter(
                                  (opt) => opt !== option
                                );

                                return updatedOptions;
                              });
                            }}
                            size="18"
                            className=" cursor-pointer absolute top-0 right-0"
                          ></X>
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="flex flex-row justify-between gap-3 items-center">
                <div className="flex-1">
                  <button
                    onClick={handelPrevious}
                    className="mt-4 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 w-full rounded-md py-2"
                  >
                    Previews
                  </button>
                </div>
                <div className="flex-1">
                  <button
                    onClick={handleNext}
                    className="mt-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 w-full rounded-md py-2"
                  >
                    Next
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

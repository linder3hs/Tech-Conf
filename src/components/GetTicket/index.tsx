import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { signInWithSocialMedia } from "@services/auth";
import { insertDataIntoTable } from "@services/config";
import useUserSubscriber from "@hooks/useUserSubscriber";
import useUser from "@hooks/useUser";
import Swal from "sweetalert2";
import type { Provider } from "@supabase/supabase-js";

interface Props {
  id: number;
}

export default function GetTicket(props: Props) {
  const { id } = props;

  const { handleIsSubscribed } = useUserSubscriber();

  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const { user } = useUser();

  const handleSubscribe = async (provider: Provider = "github") => {
    if (!user) {
      await signInWithSocialMedia(provider);
      return;
    }

    const isSubscribed = await handleIsSubscribed(String(id), user.id);

    if (isSubscribed) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Ya te has inscrito a este evento",
      });
      return;
    }

    const response = await insertDataIntoTable("tickets", {
      user_id: user.id,
      event_id: id,
    });

    if (!response) {
      Swal.fire({
        icon: "success",
        title: "Oops...",
        text: "Algo salió mal, intentalo de nuevo",
      });

      return;
    }

    window.location.reload();
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="mt-10 bg-yellow-500 p-3 font-medium text-black border-black border-2 rounded-md hover:scale-125 hover:duration-300"
      >
        Consigue tu ticket!
      </button>
      <p className="mt-2">Es gratis!</p>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Inscribite al evento
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Ven y entérate de las ultimas novedades sobre el
                            desarrollo de software.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 flex gap-10">
                      <button
                        className="bg-red-500 p-4 rounded-md"
                        onClick={() => handleSubscribe("google")}
                      >
                        Unírse con Google
                      </button>
                      <button
                        className="bg-gray-900 p-3 rounded-md"
                        onClick={() => handleSubscribe()}
                      >
                        Unírse con GitHub
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

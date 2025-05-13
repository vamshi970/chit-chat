import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { InboxStackIcon } from "@heroicons/react/24/outline";
import FriendRequestCard from "../ui/dashboard/FriendRequestCard";
import DashboardLoader from "../ui/loaders/DashboardLoader";
import EmptyNotifications from "../ui/dashboard/EmptyNotifications";
import { useNotificationsQuery } from "../../hooks/user";

interface NotificationsModalProps {
  isModalOpen: boolean;
  setOpenNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NotificationsModal({
  isModalOpen,
  setOpenNotifications,
}: NotificationsModalProps) {
  const { data, isLoading, isRefetching } = useNotificationsQuery();

  return (
    <Transition show={isModalOpen}>
      <Dialog className="relative z-10" onClose={() => setOpenNotifications(false)}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                {/* <!-- Header --> */}
                <div className="bg-white px-4 border-b pt-3 pb-2 ">
                  <div className="sm:flex sm:items-center">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-400 sm:mx-0 sm:h-10 sm:w-10">
                      <InboxStackIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900"
                      >
                        Notifications
                      </DialogTitle>
                    </div>
                  </div>
                </div>

                {/* <!-- Body --> */}

                {isLoading || isRefetching ? (
                  <DashboardLoader />
                ) : data && data.length ? (
                  <div className="px-6 my-3">
                    {data.map((request, index) => (
                      <FriendRequestCard key={index} request={request} />
                    ))}
                  </div>
                ) : (
                  <EmptyNotifications />
                )}

                {/* <!-- Footer --> */}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t ">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpenNotifications(false)}
                  >
                    Accept all
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpenNotifications(false)}
                    data-autofocus
                  >
                    Back
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

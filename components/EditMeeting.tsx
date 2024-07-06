"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactDatePicker from "react-datepicker";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { X, Calendar, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Meeting {
  title: string;
  description: string;
  dateTime: string;
}

interface EditMeetingProps {
  meeting: Meeting;
  onSave: (updatedMeeting: Meeting) => void;
  onClose: () => void;
}

const EditMeeting: React.FC<EditMeetingProps> = ({
  meeting,
  onSave,
  onClose,
}) => {
  const [editedMeeting, setEditedMeeting] = useState<Meeting>({
    ...meeting,
    dateTime: new Date(Date.now()).toISOString(),
  });

  const { toast } = useToast();

  const handleSave = () => {
    onSave(editedMeeting);
    toast({
      title: "Meeting Updated",
      description: "Your changes have been saved successfully.",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="w-full max-w-2xl rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Edit Meeting</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Meeting Title
              </label>
              <Input
                value={editedMeeting.title}
                onChange={(e) =>
                  setEditedMeeting({ ...editedMeeting, title: e.target.value })
                }
                className="w-full bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <Textarea
                value={editedMeeting.description}
                onChange={(e) =>
                  setEditedMeeting({
                    ...editedMeeting,
                    description: e.target.value,
                  })
                }
                className="w-full bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Date and Time
              </label>
              <div className="relative">
                <ReactDatePicker
                  selected={new Date(editedMeeting.dateTime)}
                  onChange={(date: Date | null) =>
                    date &&
                    setEditedMeeting({
                      ...editedMeeting,
                      dateTime: date.toISOString(),
                    })
                  }
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500 rounded-md p-2"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Calendar size={20} />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              >
                <Save size={20} className="mr-2" />
                Save Changes
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditMeeting;

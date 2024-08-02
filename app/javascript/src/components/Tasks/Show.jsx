import React, { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router-dom";

import tasksApi from "apis/tasks";
import { Button, Container, PageLoader, UserAvatar } from "components/commons";

import { STATUS_OPTIONS } from "./constants";

const Show = () => {
  const [task, setTask] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();

  const history = useHistory();

  const updateTask = () => {
    history.push(`/tasks/${task.slug}/edit`);
  };

  const fetchTaskDetails = async () => {
    try {
      const {
        data: { task },
      } = await tasksApi.show(slug);
      setTask(task);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      history.push("/");
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <div className="mt-8 flex w-full items-start justify-between gap-x-6">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-3xl font-semibold">
              Task Title: {task?.title}
            </h2>
            <div className="mt-8 mb-4">
              <div className="font-semibold">Description:</div>
              <div className="bg-gray-100 rounded-md px-2 py-4 mt-2">
                {task?.description}
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-base text-gray-700">
                <span className="font-semibold">Assigned to: </span>
                <UserAvatar
                  avatarUrl={task?.assigned_user?.avatar_url}
                  name={task?.assigned_user?.name}
                />
              </p>
              <p className="text-base text-gray-700">
                <span className="font-semibold">Created by: </span>
                <UserAvatar
                  avatarUrl={task?.task_owner?.avatar_url}
                  name={task?.task_owner?.name}
                />
              </p>
              <p className="text-base text-gray-700">
                <span className="font-semibold">Status: </span>
                {STATUS_OPTIONS[task?.status]}
              </p>
            </div>
            <div className="flex items-center mt-6 gap-x-3">
              <Button
                buttonText="Edit"
                icon="edit-line"
                size="medium"
                style="secondary"
                onClick={updateTask}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Show;

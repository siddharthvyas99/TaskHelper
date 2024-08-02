import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import tasksApi from "apis/tasks";
import usersApi from "apis/users";
import { Container, PageLoader, PageTitle } from "components/commons";

import Form from "./Form";

const Edit = ({ history }) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [status, setStatus] = useState("to_do");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await tasksApi.update({
        slug,
        payload: {
          title,
          description,
          status,
          assigned_user_id: userId,
          due_date: dueDate,
        },
      });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const {
        data: { users },
      } = await usersApi.fetch();
      setUsers(users);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchTaskDetails = async () => {
    try {
      const {
        data: {
          task: {
            title,
            description,
            status,
            assigned_user,
            due_date: dueDate,
          },
        },
      } = await tasksApi.show(slug);
      setTitle(title);
      setAssignedUser(assigned_user);
      setUserId(assigned_user.id);
      setDescription(description);
      setDueDate(dueDate);
      setStatus(status);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const loadData = async () => {
    await Promise.all([fetchTaskDetails(), fetchUserDetails()]);
    setPageLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="Edit task" />
        <Form
          assignedUser={assignedUser}
          description={description}
          dueDate={dueDate}
          handleSubmit={handleSubmit}
          loading={loading}
          setDescription={setDescription}
          setDueDate={setDueDate}
          setStatus={setStatus}
          setTitle={setTitle}
          setUserId={setUserId}
          status={status}
          title={title}
          type="update"
          users={users}
        />
      </div>
    </Container>
  );
};

export default Edit;

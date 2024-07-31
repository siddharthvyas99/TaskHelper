import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import tasksApi from "apis/tasks";
import { Container, PageLoader, PageTitle } from "components/commons";

import Form from "./Form";

const Edit = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await tasksApi.update({
        slug,
        payload: { title, description },
      });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const fetchTaskDetails = async () => {
    try {
      const {
        data: {
          task: { title, description },
        },
      } = await tasksApi.show(slug);
      setTitle(title);
      setDescription(description);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
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
          description={description}
          handleSubmit={handleSubmit}
          loading={loading}
          setDescription={setDescription}
          setTitle={setTitle}
          title={title}
          type="update"
        />
      </div>
    </Container>
  );
};

export default Edit;

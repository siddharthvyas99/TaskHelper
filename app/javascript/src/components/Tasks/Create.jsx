import React, { useState } from "react";

import tasksApi from "apis/tasks";
import { Container, PageTitle } from "components/commons";

import Form from "./Form";

const Create = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await tasksApi.create({ task: { title, description } });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="Add new task" />
        <Form
          description={description}
          handleSubmit={handleSubmit}
          loading={loading}
          setDescription={setDescription}
          setTitle={setTitle}
          title={title}
        />
      </div>
    </Container>
  );
};

export default Create;

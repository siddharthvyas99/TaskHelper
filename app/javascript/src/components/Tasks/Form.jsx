import React from "react";

import { Input, Button } from "components/commons";

const Form = ({
  type = "create",
  title,
  description,
  setTitle,
  setDescription,
  loading,
  handleSubmit,
}) => (
  <form className="mb-4 w-full space-y-2" onSubmit={handleSubmit}>
    <Input
      label="Title"
      placeholder="Todo Title (Max 125 Characters Allowed)"
      value={title}
      onChange={e => setTitle(e.target.value.slice(0, 125))}
    />
    <Input
      label="Description"
      placeholder="Todo Description"
      type="textaread"
      value={description}
      onChange={e => setDescription(e.target.value)}
    />
    <Button
      buttonText={type === "create" ? "Create Task" : "Update Task"}
      loading={loading}
      type="submit"
    />
  </form>
);

export default Form;

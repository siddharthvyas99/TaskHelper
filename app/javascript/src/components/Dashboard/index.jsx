import React, { useState, useEffect } from "react";

import { isNil, isEmpty, either, toPairs, isNotEmpty } from "ramda";
import Select from "react-select";

import tasksApi from "apis/tasks";
import { PageLoader, PageTitle, Container } from "components/commons";
import { STATUS_OPTIONS } from "components/Tasks/constants";
import Table from "components/Tasks/Table";

const Dashboard = ({ history }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const statusOptions = toPairs(STATUS_OPTIONS).map(([key, value]) => ({
    label: value,
    value: key,
  }));
  const filterOptions = [...statusOptions, { label: "All", value: "all" }];

  const fetchTasks = async () => {
    try {
      const {
        data: { tasks },
      } = await tasksApi.fetch();
      setTasks(tasks);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const destroyTask = async slug => {
    try {
      await tasksApi.destroy(slug);
      await fetchTasks();
    } catch (error) {
      logger.error(error);
    }
  };

  const showTask = slug => {
    history.push(`/tasks/${slug}/show`);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (statusFilter && isNotEmpty(statusFilter)) {
      const filtered = tasks.filter(task => statusFilter.includes(task.status));
      setFilteredTasks(statusFilter.includes("all") ? tasks : filtered);
    } else {
      setFilteredTasks(tasks);
    }
  }, [tasks, statusFilter]);

  const handleStatusChange = selectedOptions => {
    setStatusFilter(
      selectedOptions ? selectedOptions.map(option => option.value) : null
    );
  };

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(tasks)) {
    return (
      <Container>
        <h1 className="my-5 text-center text-xl leading-5">
          You have not created or been assigned any tasks 🥳
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="All Tasks">
          <div className="mt-8">
            <Select
              isMulti
              isSearchable
              menuPosition="fixed"
              name="statusFilter"
              options={filterOptions}
              placeholder="Filter by status"
              value={filterOptions.filter(option =>
                statusFilter?.includes(option.value)
              )}
              onChange={handleStatusChange}
            />
          </div>
        </PageTitle>
        <Table
          data={filteredTasks}
          destroyTask={destroyTask}
          showTask={showTask}
        />
      </div>
    </Container>
  );
};

export default Dashboard;

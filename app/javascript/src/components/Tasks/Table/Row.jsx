import React from "react";

import classNames from "classnames";
import PropTypes from "prop-types";

import { Tooltip, UserAvatar } from "components/commons";
import { formatDueDate, isPastDate, isPastDateBy } from "utils/datetime";

import { STATUS_OPTIONS } from "../constants";

const Row = ({ data, destroyTask, showTask }) => (
  <tbody className="divide-y divide-gray-200 bg-white">
    {data.map(rowData => (
      <tr key={rowData.id}>
        <td className="border-r border-gray-300 px-4 py-2.5 text-sm font-medium capitalize">
          <Tooltip tooltipContent={rowData.title}>
            <span>{rowData.title}</span>
          </Tooltip>
        </td>
        <td className="whitespace-no-wrap border-r border-gray-300 px-4 py-2.5 text-sm text-gray-800">
          <UserAvatar
            avatarUrl={rowData?.assigned_user?.avatar_url}
            name={rowData.assigned_user.name}
          />
        </td>
        <td className="whitespace-no-wrap border-r border-gray-300 px-4 py-2.5 text-sm text-gray-800">
          {STATUS_OPTIONS[rowData?.status]}
        </td>
        <td className="whitespace-no-wrap border-r border-gray-300 px-4 py-2.5 text-sm text-gray-800">
          <span
            className={classNames(
              {
                "text-red-600":
                  isPastDate(rowData?.due_date) && rowData?.status !== "done",
              },
              "whitespace-nowrap"
            )}
          >
            <Tooltip tooltipContent={isPastDateBy(rowData?.due_date)}>
              <span>{formatDueDate(rowData?.due_date)}</span>
            </Tooltip>
          </span>
        </td>
        <td className="px-6 py-4 text-sm font-medium leading-5 cursor-pointer">
          <a className="text-indigo-600" onClick={() => showTask(rowData.slug)}>
            Show
          </a>
        </td>
        <td className="cursor-pointer px-6 py-4 text-sm font-medium leading-5">
          <a
            className="text-red-500
              hover:text-red-700"
            onClick={() => destroyTask(rowData.slug)}
          >
            Delete
          </a>
        </td>
      </tr>
    ))}
  </tbody>
);

Row.propTypes = {
  data: PropTypes.array.isRequired,
  showTask: PropTypes.func,
};

export default Row;

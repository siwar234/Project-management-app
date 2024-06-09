export function initTasks(tasks) {


 const formattedTasks = tasks.map(task => ({
    ...task,
    StartDate: new Date(task.StartDate),
    EndDate: new Date(task.EndDate)
  }));

  return formattedTasks;
}
export function getStartEndDateForProject(formattedtasks) {
  let start = formattedtasks[0].start;
  let end = formattedtasks[0].end;
  for (let i = 0; i < formattedtasks.length; i++) {
    const task = formattedtasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}

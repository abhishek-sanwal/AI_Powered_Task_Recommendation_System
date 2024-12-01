

def recommend(tasks):

    tasks.sort(key=lambda task: (-task.priority, -
               task.deadline, task.estimated_time))

    return tasks

# Recurring, Scheduled Tasks

There are a class of problems that rely on scheduled tasks to occur on a regular interval. Perhaps you backup logs on a daily basis, send emails with a certain frequency, or water your grass at a specific time every weekday. Cron is a Linux tool that allows scheduling theses tasks, also known as jobs, with a succient string pattern. For instance `"*/1 * * * *"` means run this job every minute. The trailing `*` are placeholders for hours, day of month, month and weekday.

The job will be encapsulated in a contianer giving you portability when implementing the job's logic. In the Linux world we could use cron process to start a cron job, but to change its frequency, or schedule, we would have to kill the job and create a new one. When using a CronJob Kubernetes object we can update the schedule of the job by updating our deployment and re-applying and the Kubernetes controllers will ensure the desired state is met.

```
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: recurring-workload
spec:
  schedule: "*/1 * * * *" # Minutes, Hours, Day of Month, Month, Weekday
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: worker
              image: walkerrandolphsmith/worker:1.0
          restartPolicy: OnFailure
```


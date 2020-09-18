while true; do sleep 1;
xargs -I % -P 5000 curl "http://monitored.api.com/api/fast" < <(printf '%s\n' {1..100})
xargs -I % -P 5000 curl "http://monitored.api.com/api/error" < <(printf '%s\n' {1..100})
xargs -I % -P 10 curl "http://monitored.api.com/api/slow" < <(printf '%s\n' {1..100})
echo -e '\n\n\n\n'$(date);done

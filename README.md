# Moon Active Backend Exercise
Tom Grossman


## Running with docker-compose
1. clone 
```shell
python3 -m deployment.cluster \
    --project intsights-dev-2 \
    --command create

python3 -m deployment.cluster \
    --project intsights-dev-2 \
    --command delete

python3 -m deployment.cluster \
    --project intsights-dev-2 \
    --command setup

python3 -m deployment.cluster \
    --project intsights-dev-2 \
    --command start

python3 -m deployment.cluster \
    --project intsights-dev-2 \
    --command stop

python3 -m deployment.cluster \
    --project intsights-dev-2 \
    --command reset
```
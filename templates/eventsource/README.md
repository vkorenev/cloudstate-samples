
# Cloudstate Service

The following assumes that you have completed the steps for setting up your local environment as well as creating an account and project.  If you have not done this you must follow the instructions here:

* [Setting Up your Machine](https://docs.lbcs.dev/gettingstarted/setup.html)
   * as well as the [Developer prerequisites](https://docs.lbcs.dev/developing/developing.html#prerequisites)
   * You also need to install the protobuf compiler.
* [Your Lightbend Cloudstate Account](https://docs.lbcs.dev/gettingstarted/account.html)
* [Creating a Project](https://docs.lbcs.dev/gettingstarted/project.html)

## Layout
* Source code `js` and `proto` files are in this directory
* A `deploy` directory that contains the deployment yaml files.

### Storage Setup
* Modify `deploy/postgres-store.yaml`
    * Uniquify the store `name`
* Modify my-service.yaml to match
*   Change `spec|storeConfig|statefulStore|name` to match the name used above

## You Code
You want to make changes to the following files:
* Edit both the `domain.proto` and the `myservice.proto`, renaming those files as you see fit.
* Once your model, command and events are defined how like we need to know impliment the service.
* Edit the `index.js` file.  Again renaming the file and contents to your liking.
   * Follow the comments in these files as a guide to help you edit.

## Building 
```
npm install
npm run prestart

```

This will compile the protobuf and `user-function.desc`
Build a docker image with the right registry and tag
```
docker build . -t <my-registry>/my-service:latest
```

Push the docker image to the registry
```
docker push <my-registry>/my-service:latest
```

Deploy the image by changing into the deploy folder and editing the `my-service.yaml` to point to your docker image that you just pushed.
```
cd ../deploy
cat my-service.yaml
apiVersion: cloudstate.io/v1alpha1
kind: StatefulService
metadata:
  name: my-service
spec:
  containers:
  - image: coreyauger/my-service:latest    # <-- Change this to your image
    name: my-service
```

## Deploy

Deploy the stateful store to your project namespace
```
kubectl apply -f postgres-store.yaml -n <project-name>
statefulstore.cloudstate.io/my-postgres created
````

Deploy the service to your project namespace
```
kubectl apply -f my-service.yaml -n <project-name>
statefulservice.cloudstate.io/my-service created
````

### Verify they are running
Check that the service is running
```
kubectl get statefulservices -n <project-name>
NAME             REPLICAS   STATUS
my-service       1          Ready

kubectl get statefulstore -n <project-name>
NAME             REPLICAS   STATUS
my-postgres      1          Ready
```

To redeploy a new image to the cluster you must delete and then redeploy using the yaml file.  
For example if we updated the my-service docker image we would do the following.
````
kubectl delete statefulservice my-service -n <project-name>
statefulservice.cloudstate.io "my-service" deleted
kubectl apply -f my-service.yaml -n <project-name>    
statefulservice.cloudstate.io/my-service created
````

## Routes
Public routes can be used through grpc and grpc-web calls.  These exist in the `routes.yaml` file.

```
cat routes.yaml
apiVersion: cloudstate.io/v1alpha1
kind: Route
metadata:
  name: "my-routes"
spec:
  http:
  - name: "my-routes"
    match:
    - uri:
        prefix: "/"
    route:
      service: my-service     
```

Add these routes by performing
```
kubectl apply -f routes.yaml -n <project-name>
```

The web url that will resolve the above route to the default route:
NOTE: that utilities like `grpcurl` user service reflection on the default route `/`.  What this means is that you 
can only use `grpcurl` with the service on the default route.

`https://<project-name>.us-east1.apps.lbcs.dev/`


## Maintenance notes

### License
The license is Apache 2.0, see [LICENSE-2.0.txt](LICENSE-2.0.txt).

### Maintained by
__This project is NOT supported under the Lightbend subscription.__

This project is maintained mostly by @coreyauger and @cloudstateio.

Feel free to ping above maintainers for code review or discussions. Pull requests are very welcome–thanks in advance!


### Disclaimer

[DISCLAIMER.txt](../DISCLAIMER.txt)

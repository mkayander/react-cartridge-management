import { api } from "./api";

export class CommonApi {
    constructor(path, messages, callbacks) {
        this.messages = messages;
        this.path = path;
        this.callbacks = callbacks;
    }

    // checkFields() {
    //     console.log(
    //         "CommonApi.checkFields:",
    //         this.messages,
    //         this.path,
    //         this.callbacks
    //     );
    // }

    refresh() {
        console.log("CommonApi.getAll");
        return api
            .get(this.path)
            .catch((reason) => this.callbacks.error(reason))
            .then((response) => this.callbacks.setState(response.data));
    }

    create = async (instance) => {
        // console.log("CommonApi.create", instance, this);
        api.post(this.path, instance)
            .catch((reason) => {
                this.callbacks.error(
                    this.messages.create.error + " \n " + reason
                );
                console.log("CommonApi.create.catch", reason.body);
            })
            .then(
                () => {
                    // this.callbacks.refresh();
                    this.refresh();
                    this.callbacks.success(this.messages.create.success);
                    // console.log(
                    //     "CommonApi.create.then",
                    //     this.callbacks.success,
                    //     this.messages.create.success
                    // );
                },
                (reason) =>
                    console.log("CommonApi.create.then.onrejected:", reason)
            );
    };

    update = async (instance) => {
        // console.log("CommonApi.update", instance);
        api.put(`${this.path}${instance.id}/`, instance)
            .catch((reason) => {
                this.callbacks.error(
                    this.messages.update.error + " \n " + reason
                );
            })
            .then(() => {
                // this.callbacks.refresh();
                this.refresh();
                this.callbacks.success(this.messages.update.success);
            });
    };

    delete = async (instance) => {
        // console.log("CommonApi.delete", instance);
        api.delete(`${this.path}${instance.id}/`)
            .catch((reason) => {
                this.callbacks.error(
                    this.messages.delete.error + " \n " + reason
                );
            })
            .then(() => {
                // this.callbacks.refresh();
                this.refresh();
                this.callbacks.success(this.messages.delete.success);
            });
    };
}

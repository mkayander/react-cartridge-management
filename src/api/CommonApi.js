import { api } from "./api";

export class CommonApi {
    constructor(path, messages, callbacks) {
        this.messages = messages;
        this.path = path;
        this.callbacks = callbacks;
    }

    checkFields() {
        console.log(
            "CommonApi.checkFields:",
            this.messages,
            this.path,
            this.callbacks
        );
    }

    getAll() {
        return api
            .get(this.path)
            .catch((reason) => this.callbacks.error(reason));
    }

    create = (instance) => {
        console.log("CommonApi.create", instance, this);
        api.post(this.path, instance)
            .catch((reason) => {
                this.callbacks.error(
                    this.messages.create.error + " \n " + reason
                );
                console.log("CommonApi.create.catch", reason.body);
            })
            .then(
                () => {
                    this.callbacks.refresh();
                    this.callbacks.success(this.messages.create.success);
                    console.log("CommonApi.create.then");
                },
                (reason) =>
                    console.log("CommonApi.create.then.onrejected:", reason)
            );
    };

    update = (instance) => {
        console.log("CommonApi.update", instance);
        api.put(`${this.path}${instance.id}/`, instance)
            .catch((reason) => {
                this.callbacks.error(
                    this.messages.update.error + " \n " + reason
                );
            })
            .then(() => {
                this.callbacks.refresh();
                this.callbacks.success(this.messages.update.success);
            });
    };

    delete = (instance) => {
        console.log("CommonApi.delete", instance);
        api.delete(`${this.path}${instance.id}/`)
            .catch((reason) => {
                this.callbacks.error(
                    this.messages.delete.error + " \n " + reason
                );
            })
            .then(() => {
                this.callbacks.refresh();
                this.callbacks.success(this.messages.delete.success);
            });
    };
}

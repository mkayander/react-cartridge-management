import { api } from "./api";

export class CommonApi {
    constructor(path, messages, callbacks) {
        this.messages = messages;
        this.path = path;
        this.callbacks = callbacks;
    }

    refresh() {
        return api
            .get(this.path)
            .catch((reason) => this.callbacks.error(reason))
            .then((response) => this.callbacks.setState(response.data));
    }

    create = async (instance) => {
        api.post(this.path, instance)
            .catch((reason) => {
                this.callbacks.error(
                    this.messages.create.error + " \n " + reason
                );
                console.log("CommonApi.create.catch", reason.body);
            })
            .then(
                () => {
                    this.callbacks.refreshAll();
                    this.callbacks.success(this.messages.create.success);
                },
                (reason) =>
                    console.log("CommonApi.create.then.onrejected:", reason)
            );
    };

    update = async (instance) => {
        api.put(`${this.path}${instance.id}/`, instance)
            .catch((reason) => {
                this.callbacks.error(
                    this.messages.update.error + " \n " + reason
                );
            })
            .then(() => {
                this.callbacks.refreshAll();
                this.callbacks.success(this.messages.update.success);
            });
    };

    delete = async (instance) => {
        api.delete(`${this.path}${instance.id}/`)
            .catch((reason) => {
                this.callbacks.error(
                    this.messages.delete.error + " \n " + reason
                );
            })
            .then(() => {
                this.callbacks.refreshAll();
                this.callbacks.success(this.messages.delete.success);
            });
    };
}

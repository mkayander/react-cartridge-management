// import { api } from "./api";

import api from "./api";

export class CommonApi {
    constructor(path, messages, callbacks) {
        this.messages = messages;
        this.path = path;
        this.callbacks = callbacks;
    }

    // refresh() {
    //     return api
    //         .get(this.path)
    //         .catch((reason) => this.callbacks.error(reason))
    //         .then((response) => this.callbacks.setState(response.data));
    // }

    create = async (instance) => {
        this.callbacks.setLoading(true);
        api.post(this.path, instance)
            .then(() => {
                this.callbacks.refreshAll();
                this.callbacks.success(this.messages.create.success);
            })
            .catch((reason) => {
                this.callbacks.setLoading(false);
                this.callbacks.error(
                    this.messages.create.error + " \n " + reason
                );
                // console.log("CommonApi.create.catch", reason.body);
            });
        // .finally(() => this.callbacks.setLoading(false));
    };

    update = async (instance) => {
        this.callbacks.setLoading(true);
        api.put(`${this.path}${instance.id}/`, instance)
            .then(() => {
                this.callbacks.refreshAll();
                this.callbacks.success(this.messages.update.success);
            })
            .catch((reason) => {
                this.callbacks.setLoading(false);
                this.callbacks.error(
                    this.messages.update.error + " \n " + reason
                );
            });
        // .finally(() => this.callbacks.setLoading(false));
    };

    delete = async (instance) => {
        this.callbacks.setLoading(true);
        api.delete(`${this.path}${instance.id}/`)
            .then(() => {
                this.callbacks.refreshAll();
                this.callbacks.success(this.messages.delete.success);
            })
            .catch((reason) => {
                this.callbacks.setLoading(false);
                this.callbacks.error(
                    this.messages.delete.error + " \n " + reason
                );
            });
        // .finally(() => this.callbacks.setLoading(false));
    };
}

import { omit, flow, first, isEmpty } from "lodash/fp";
import { dataMachine } from "./dataMachine";
import { httpClient } from "../utils/asyncUtils";
import { backendPort } from "../utils/portUtils";
export const appUrl = process.env.APP_URL;

export const transactionDetailMachine = dataMachine("transactionData").withConfig({
  services: {
    fetchData: async (ctx, event: any) => {
      const payload = omit("type", event);
      const contextTransactionId = !isEmpty(ctx.results) && first(ctx.results)["id"];
      const transactionId = contextTransactionId || payload.transactionId;
<<<<<<< HEAD
      const resp = await httpClient.get(
        `http://localhost:${backendPort}/transactions/${transactionId}`
      );
=======
      const resp = await httpClient.get(`${appUrl}:${backendPort}/transactions/${transactionId}`);
>>>>>>> 5cc4321d88288acf838b90cc0f3afaeafefeb8f1
      // @ts-ignore
      return { results: [resp.data.transaction] };
    },
    createData: async (ctx, event: any) => {
      let route = event.entity === "LIKE" ? "likes" : "comments";
      const payload = flow(omit("type"), omit("entity"))(event);
      const resp = await httpClient.post(
        `http://localhost:${backendPort}/${route}/${payload.transactionId}`,
        payload
      );
      return resp.data;
    },
    updateData: async (ctx, event: any) => {
      const payload = omit("type", event);
      const contextTransactionId = !isEmpty(ctx.results) && first(ctx.results)["id"];
      const transactionId = contextTransactionId || payload.id;
      const resp = await httpClient.patch(
        `http://localhost:${backendPort}/transactions/${transactionId}`,
        payload
      );
      return resp.data;
    },
  },
});

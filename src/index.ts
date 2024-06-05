import { ALPHA_AZ_VALUE, MAX_OPTIONS_COUNT, MOCKY_URL, NEWLINE_CHARACTER, NON_BREAKING_SPACE } from "./consts";
import { post } from "./services/fetch";

import "./field-builder/field-builder";
import "./styles.css";
import { FieldForm } from "./types";

const alphaInput = (document.getElementById("order") as HTMLInputElement);
const defaultValueInput = (document.getElementById("defaultValue") as HTMLInputElement);
const labelInput = (document.getElementById("label") as HTMLInputElement);
const messages = document.getElementById("messages") as HTMLDivElement;
const optionsTextArea = (document.getElementById("options") as HTMLTextAreaElement);
const requiredValueInput = (document.getElementById("requiredValue") as HTMLInputElement);

let formData: FieldForm;
const form = document.getElementById("form");

form?.addEventListener("submit", async (event) => {
    const alphabetical = alphaInput.value === ALPHA_AZ_VALUE;
    const defaultValue = defaultValueInput.value.trim();
    const label = labelInput.value.trim();
    const options = optionsTextArea.value.split(NEWLINE_CHARACTER)
        .map(option => option.trim()).filter(option => option);
    const requiredValue = requiredValueInput.checked;

    messages.innerHTML = "";

    // Validations
    if (!label) {
        const para = document.createElement("p");
        const node = document.createTextNode("Label is required");

        para.appendChild(node);
        messages.appendChild(para);

        event.preventDefault();

        return;
    }

    const uniqueOptions = Array.from(new Set(options));

    if (uniqueOptions.length !== options.length) {
        const para = document.createElement("p");
        const node = document.createTextNode("Duplicate options are not allowed");

        para.appendChild(node);
        messages.appendChild(para);

        event.preventDefault();

        return;
    }

    if (uniqueOptions.length > MAX_OPTIONS_COUNT) {
        const para = document.createElement("p");
        const node = document.createTextNode(`No more than ${MAX_OPTIONS_COUNT} options are allowed`);

        para.appendChild(node);
        messages.appendChild(para);

        event.preventDefault();

        return;
    }

    if (defaultValue && !uniqueOptions.includes(defaultValue)) {
        if (uniqueOptions.length < MAX_OPTIONS_COUNT) {
            uniqueOptions.push(defaultValue);
        } else {
            const para = document.createElement("p");
            const node = document.createTextNode(`Cannot add default value as ${MAX_OPTIONS_COUNT} options allowed`);

            para.appendChild(node);
            messages.appendChild(para);

            event.preventDefault();

            return;
        }
    }

    // Submit
    formData = {
        alphabetical,
        defaultValue,
        label,
        options: uniqueOptions,
        requiredValue
    }

    console.log("---> Data", formData);

    event.preventDefault();

    // TODO:
    optionsTextArea.value = uniqueOptions.join(NEWLINE_CHARACTER);
    messages.innerHTML = "Form saved successfully";

    await post(MOCKY_URL, formData);
});

const cancel = document.getElementById("cancel");

cancel?.addEventListener("click", () => {
    alphaInput.value = ALPHA_AZ_VALUE; // formData?.alphabetical
    defaultValueInput.value = formData?.defaultValue || "";
    messages.innerHTML = NON_BREAKING_SPACE;
    labelInput.value = formData?.label || "";
    optionsTextArea.value = formData?.options.join(NEWLINE_CHARACTER) || "";
    requiredValueInput.checked = formData?.requiredValue || true;
});

const clear = document.getElementById("clear");

clear?.addEventListener("click", () => {
    alphaInput.value = ALPHA_AZ_VALUE;
    defaultValueInput.value = "";
    messages.innerHTML = NON_BREAKING_SPACE;
    labelInput.value = "";
    optionsTextArea.value = "";
    requiredValueInput.checked = true;
});

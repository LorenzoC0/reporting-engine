/** @odoo-module **/

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Component, useState, onMounted } from "@odoo/owl";
import { standardFieldProps } from "@web/views/fields/standard_field_props";

export class PdfPreviewWidget extends Component {
    setup() {
        this.state = useState({
            isModalVisible: false,
            pdfUrl: null
        });
        this.notification = useService("notification");
    }

    _b64toBlob(b64Data, contentType = '', sliceSize = 512) {
        if (!b64Data) return null;

        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);

            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType, title: 'Download.pdf' });
        return blob;
    }

    handlePreviewClick() {
        try {
            const value = this.props.value;
            if (!value) {
                this.notification.add(this.env._t("No PDF content available"), { type: "warning" });
                return;
            }

            const resBlob = this._b64toBlob(value, 'application/pdf');
            if (!resBlob) {
                this.notification.add(this.env._t("Could not decode PDF data"), { type: "warning" });
                return;
            }

            const resFile = new File([resBlob], 'Download.pdf', { type: 'application/pdf' });
            const resUrl = URL.createObjectURL(resFile, { type: 'application/pdf' });

            this.state.pdfUrl = resUrl;
            this.state.isModalVisible = true;
        } catch (error) {
            this.notification.add(this.env._t("Error displaying PDF preview"), { type: "danger" });
            console.error("PDF Preview error:", error);
        }
    }

    closeModal() {
        this.state.isModalVisible = false;
        // Clean up the URL object to prevent memory leaks
        if (this.state.pdfUrl) {
            URL.revokeObjectURL(this.state.pdfUrl);
            this.state.pdfUrl = null;
        }
    }
}

PdfPreviewWidget.template = "report_pdf_fixed_position.PdfPreviewWidget";
PdfPreviewWidget.props = {
    ...standardFieldProps,
    value: { type: String, optional: true },
};

registry.category("fields").add("pdf_preview", PdfPreviewWidget);
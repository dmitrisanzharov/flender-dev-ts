/// <reference types="react-scripts" />
declare module "moment";
declare module "classnames";
declare module "html2pdf";

declare global {
	interface Window {
		html2pdf: any;
	}
}

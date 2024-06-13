export type File = {
	id: string;
	name: string;
};

export type LoadingFile = File & { loading: boolean | undefined };

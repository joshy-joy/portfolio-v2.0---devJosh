export interface Project {
    id: string,
    created_at: string,
    name: string,	
    description: string,	
    redirect: string,
    status: string,
    image: string,
    tag: Array<string>,
    updated_at: string,	
    type: string,
}

export interface ProjectList {
    personal?: Array<Project>;
    company?: Array<Project>;
}

export interface Data {
    projects?: ProjectList;
    isPersonalProjectEmpty: boolean;
    IsCompanyProjectEmpty: boolean;
}
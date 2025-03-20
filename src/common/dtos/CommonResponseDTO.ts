interface PaginationMetadata {
    type?: "list" | "item";
    start?: number;
    limit?: number;
    total?: number;
}

export class CommonResponseDTO<T> {
    metadata: PaginationMetadata;
    data: T;
}

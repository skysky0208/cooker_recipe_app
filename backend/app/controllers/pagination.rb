module Pagination
    def resources_with_pagination(resources)
        {
            current:  resources.current_page,   
            limit_value: resources.limit_value,
            pages:    resources.total_pages,
        }
    end
end
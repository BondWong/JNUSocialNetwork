package service.helper;

import java.io.IOException;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;

@SSE
public class AccessControlAllowOriginReponseFilter implements
		ContainerResponseFilter {

	@Override
	public void filter(ContainerRequestContext requestContext,
			ContainerResponseContext responseContext) throws IOException {
		// TODO Auto-generated method stub
		responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
	}

}

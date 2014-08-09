package security.helper;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ReaderInterceptor;
import javax.ws.rs.ext.ReaderInterceptorContext;

import utils.JsonUtil;

public class ApplicationValidationIntercepter implements ReaderInterceptor {

	@SuppressWarnings("unchecked")
	@Override
	public Object aroundReadFrom(ReaderInterceptorContext context)
			throws IOException, WebApplicationException {
		// TODO Auto-generated method stub
		final InputStream inputStream = context.getInputStream();
		Map<String, Object> param = JsonUtil.fromJson(inputStream, Map.class);
		if(Validator.validateApplication(param)) {
			throw new WebApplicationException(Response.Status.BAD_REQUEST);
		}
		return context.proceed();
	}
	
}

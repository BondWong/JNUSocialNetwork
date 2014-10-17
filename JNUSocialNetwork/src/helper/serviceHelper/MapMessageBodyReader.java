package helper.serviceHelper;

import java.io.IOException;
import java.io.InputStream;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.MessageBodyReader;
import javax.ws.rs.ext.Provider;

import utils.JsonUtil;

@SuppressWarnings("rawtypes")
@Provider
@Consumes(MediaType.APPLICATION_JSON)
public class MapMessageBodyReader implements MessageBodyReader<Map>{

	@Override
	public boolean isReadable(Class<?> type, Type genericType, Annotation[] annotations,
			MediaType mediaType) {
		// TODO Auto-generated method stub
		System.out.println(type == Map.class);
		return type == Map.class;
	}

	@Override
	public Map readFrom(Class<Map> type, Type genericType, Annotation[] annotations,
			MediaType mediaType, MultivaluedMap<String, String> map,
			InputStream intputStream) throws IOException, WebApplicationException {
		// TODO Auto-generated method stub
		return JsonUtil.fromJson(intputStream, type);
	}

}

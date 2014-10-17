package helper.serviceHelper;

import java.util.Map;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

import utils.JsonUtil;

@SuppressWarnings("rawtypes")
public class MapDecoder implements Decoder.Text<Map>{

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void init(EndpointConfig arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Map decode(String arg0) throws DecodeException {
		// TODO Auto-generated method stub
		System.out.println(arg0);
		return JsonUtil.fromJson(arg0, Map.class);
	}

	@Override
	public boolean willDecode(String arg0) {
		// TODO Auto-generated method stub
		return true;
	}

}

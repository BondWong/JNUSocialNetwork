package helper.serviceHelper;

import java.util.Map;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

import utils.JsonUtil;

@SuppressWarnings("rawtypes")
public class MapEncoder implements Encoder.Text<Map>{

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void init(EndpointConfig arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String encode(Map arg0) throws EncodeException {
		// TODO Auto-generated method stub
		return JsonUtil.toJson(arg0);
	}

}

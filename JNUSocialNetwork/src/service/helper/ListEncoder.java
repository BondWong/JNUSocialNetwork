package service.helper;

import java.util.List;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

import utils.JsonUtil;

@SuppressWarnings("rawtypes")
public class ListEncoder implements Encoder.Text<List>{

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void init(EndpointConfig arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String encode(List arg0) throws EncodeException {
		// TODO Auto-generated method stub
		return JsonUtil.toJson(arg0);
	}

}

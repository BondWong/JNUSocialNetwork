package service;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import service.helper.DormInfoManager;

@Path(value = "/dormInfo")
public class DormInfoService {
	@Path(value = "/getInfo/{campus}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchtDormInfo(@PathParam("campus") String campus) {
		List<String> dormInfo = new ArrayList<String>();
		dormInfo = DormInfoManager.getDormInfo(campus);
		return Response.ok(new GenericEntity<List<String>>(dormInfo){}).header("Content-Type", "application/json; charset=utf-8").build();
	}
}

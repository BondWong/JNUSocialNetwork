package service;

import java.util.LinkedHashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.media.multipart.MultiPartFeature;

@ApplicationPath("/app")
public class JnuSocialNetwork extends Application {
	public Set<Class<?>> getClasses() {
		Set<Class<?>> classes = new LinkedHashSet<Class<?>>();

		classes.add(ChatRoomService.class);
		classes.add(CommunityService.class);
		classes.add(PostService.class);
		classes.add(CommentService.class);
		classes.add(UserService.class);
		classes.add(DormInfoService.class);
		classes.add(ServerSentEventService.class);
		classes.add(JacksonFeature.class);
		classes.add(MultiPartFeature.class);
		classes.add(ApplicationService.class);
		return classes;
	}

	public Set<Object> getSingletons() {
		Set<Object> singletons = new LinkedHashSet<Object>();

		return singletons;
	}

}

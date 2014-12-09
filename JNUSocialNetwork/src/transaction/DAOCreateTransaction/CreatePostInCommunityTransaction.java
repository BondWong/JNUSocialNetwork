package transaction.DAOCreateTransaction;

import helper.serviceHelper.searchHelper.ActivitySearchMap;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.persistence.EntityManager;

import persistence.DAO;
import model.Community;
import model.Member;
import model.Post;
import model.Tag;
import model.factory.ModelFactory;
import model.modelType.PostType;
import transaction.DAOTransaction;
import transaction.Transaction;
import transaction.EmailTransaction.ActivityNotificationTransaction;
import utils.ConstantValue;

public class CreatePostInCommunityTransaction extends DAOTransaction {

	@SuppressWarnings({ "unchecked" })
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Member user = dao.get(Member.class, params[0]);
		Community community = dao.get(Community.class, params[1]);
		Post post = ModelFactory.getInstance().create(Post.class, params[2],
				params[3], params[4]);
		List<String> tags = (List<String>) params[5];
		for (String t : tags) {
			Tag tag = dao.get(Tag.class, t);
			if (tag == null)
				tag = ModelFactory.getInstance().create(Tag.class, t);
			post.addActivityTypeTag(tag);
		}
		user.createPost(community, post);
		dao.update(community);
		user.increaseLonelinessDegree(ConstantValue.POSTWEIGHT);
		if (params[2].equals(PostType.ACTIVITY)) {

			if (Long.parseLong((String) ((Map<String, Object>) params[3])
					.get("remindDate")) != ConstantValue.NONREMINDABLEMARK) {
				ActivitySearchMap.deserialize();
				ActivitySearchMap.addRecord(post.getID(), Long
						.parseLong((String) ((Map<String, Object>) params[3])
								.get("remindDate")));
				ActivitySearchMap.serialize();
			}

			StringBuffer sb = new StringBuffer();
			sb.append("\"" + community.getAttribute("name") + "\"社区发布了活动："
					+ "\"" + post.getAttribute("activityName") + "\"");
			sb.append(System.getProperty("line.separator"));
			sb.append(System.getProperty("line.separator"));
			sb.append("查看详情：http://www.campusite.com.cn/pages/activityShow.jsp?"
					+ community.getID() + "&" + post.getID());
			final String content = sb.toString();

			ExecutorService es = Executors.newSingleThreadExecutor();
			es.execute(new Runnable() {

				@Override
				public void run() {
					// TODO Auto-generated method stub
					Transaction transaction = new ActivityNotificationTransaction();
					try {
						transaction.execute(content);
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}

			});
		}

		return post.toRepresentation();
	}
}
